export async function useFetch (api) {
    let data = await fetch(api)
    let res = await data.json()
    return res
}