export const BusService = async ({ pageParam, page, token }: { pageParam?: number, page?:number, token:string|null }) => {

  return await fetch(`http://localhost:8080/api/v1/bus?page=${page}&size=${pageParam}`,
    {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
      },
    })
    .then(async response => {
      if (!response.ok) throw new Error('Error en la petición')
      return await response.json()
    })
}