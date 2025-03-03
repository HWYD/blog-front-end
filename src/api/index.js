// api.js
import Cookies from "js-cookie"
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
            'authorization': options.authorization || ''
        }
    };
    if (typeof window === 'object') {
        defaultOptions.headers.authorization = Cookies.get('authorization')
    }

    if(options.body){
        const formData = new FormData();
        // Object.entries(options.body).forEach(([key, value]) => {
        //     formData.append(key, value);
        // });
        // options.body = formData
        // 遍历对象的属性
        const data = options.body
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                if (Array.isArray(data[key])) {
                    // 如果属性是数组，将数组的每个元素分别添加到 FormData 中
                    data[key].forEach((item) => {
                        formData.append(key, item);
                    });
                } else {
                    // 如果属性不是数组，直接添加到 FormData 中
                    formData.append(key, data[key]);
                }
            }
        }
        options.body = formData
    }

    const mergedOptions = {
       ...defaultOptions,
      ...options,
      cache: 'no-store' 
    };


    // console.log('mergedOptions',mergedOptions)

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