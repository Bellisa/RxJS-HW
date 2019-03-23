import { from } from 'rxjs';

export const request = <T>(url: string, method: string = 'GET', body?: string, options?: {
    headers: {}
}) => {

    const fetchOpts: RequestInit = {
        method: method,
        // credentials: 'include',
        body: JSON.stringify(body)
    };

    Object.assign(fetchOpts, options);

    //return from(
    //    fetch(url, fetchOpts)
    //        .then((res: Response) => res.json())
    //        .catch((err) => console.log(err))
    //)
    const promise:Promise<T> = fetch(url, fetchOpts)
    .then(response => response.json())
    .then((data) => {
      if (data.error) {
        return Promise.reject(data.error);
      }

      return Promise.resolve(data);
    });
  return promise;
};

export class Rest {
    static get<T>(url: string) {
        return request<T>(url);
    }

    static post<T>(url: string, body: string) {
        const options = {
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            }
        };
        return request<T>(url, 'POST', body, options);
    }

    static put<T>(url: string, body: string) {
        const options = {
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            }
        };
        return request<T>(url, 'PUT', body, options);
    }

    static delete<T>(url: string) {
        return request<T>(url, 'DELETE');
    }
};