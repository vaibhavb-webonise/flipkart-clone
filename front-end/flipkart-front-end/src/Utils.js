const HOST = `http://localhost:9000/`

const generateResponseJSON = (stringJSON) => {
    try {
        const resp = JSON.parse(stringJSON)
        return resp
    } catch {
        return { message: stringJSON.toString() }
    }
}

export const fetchAPIResponse = async (endpoint = "", data, queryParams = null, method = "GET", docType = "json", mode = "cors", referrerPolicy = 'strict-origin-when-cross-origin', cache = "no-cache") => {
    let options = {
        method: method,
        mode: mode,
        referrerPolicy,
        cache,
        headers: {
            'Content-Type': `application/${docType}`,
        },
    }
    if (data) {
        options = {
            ...options,
            method: "POST",
            body: JSON.stringify(data)
        }
    }
    let finalHostUrl = HOST + endpoint;
    if (queryParams && method === "GET") {
        finalHostUrl += "?" + new URLSearchParams(queryParams);
    }

    const resp = await fetch(finalHostUrl, options);
    const textResponse = await resp.text()
    const dataResponse = generateResponseJSON(textResponse)
    const finalResponse = {
        status: resp.status,
        data: dataResponse,
        statusText: resp.statusText
    }
    return finalResponse
}
