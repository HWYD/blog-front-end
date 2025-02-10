// api.js
export async function fetchData(url, options = {}) {
    if (process.env.NODE_ENV === 'development') {
        console.log('当前处于开发环境',process.env.NEXT_PUBLIC_API_URL);
      } else if (process.env.NODE_ENV === 'production') {
        console.log('当前处于生产环境',process.env.NEXT_PUBLIC_API_URL);
      }
    const defaultOptions = {
        method: 'GET',
        credentials: 'include',// 发送跨域请求时携带 Cookie
        headers: {
            'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjE1MTEzMTA2OTc1IiwicGFzc3dvcmQiOiIxMjM0IiwiaWQiOjE5LCJpYXQiOjE3Mzc3MDcxNDksImV4cCI6MTczODEzOTE0OX0.KvwlbgI08hiV8G_xXrRsgrhSU7fp7ZEevXpdZvZgV4E'
        }
    };



    if(options.body){
        const formData = new FormData();
        Object.entries(options.body).forEach(([key, value]) => {
            formData.append(key, value);
        });
        options.body = formData
    }

    const mergedOptions = {
       ...defaultOptions,
      ...options,
    };

    console.log('mergedOptions',mergedOptions)

    const apiUrl = process.env.NEXT_PUBLIC_API_URL + url
    try {
        const response = await fetch(apiUrl, mergedOptions);


        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }


        const result = await response.json();
        if(result.code == 200){
            return result.data
        }
        return null;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}