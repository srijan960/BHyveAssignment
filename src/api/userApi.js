import axios from 'axios';




export const authenticate = async (body,url) => {
    var config = {
        method: 'post',
        url,
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(body)
    };
    try {
        var resp = await axios(config);
        return resp

    } catch (e) {
        alert("Please Enter a valid username or password")
        console.log(e);
    }
}

export const post = async (body,url ,token) => {
    console.log(JSON.stringify(body) +" json");
    console.log(body +" body");
    var config = {
        method: 'post',
        url,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+JSON.parse(token)
        },
        data: JSON.stringify(body)
    };
    try {
        var resp = await axios(config);
        console.log('success')
        return resp

    } catch (e) {
        console.log(e);
    }
}



export const get = async (url,token) => {
    console.log(token)
    var config = {
        method: 'get',
        url,
        headers: { 
            'Authorization': 'Bearer '+JSON.parse(token), 
            'Content-Type': 'application/json'
          },
    };
    try {
        var resp = await axios(config);
        return resp

    } catch (e) {
        console.log(e);
    }
}

