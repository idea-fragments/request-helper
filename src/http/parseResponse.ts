const CONTENT_TYPE_METHOD_MAP: { [key: string]: keyof Body } = {
  "application/json": "json",
  "application/pdf":  "blob",
}

export const parseResponse = async (r: Response): Promise<any> => {
  let contentType   = r.headers.get("content-type") ?? ""
  contentType       = Object.keys(CONTENT_TYPE_METHOD_MAP)
                            .find((k: string) => (contentType).includes(k)) ?? ""
  const parseMethod = CONTENT_TYPE_METHOD_MAP[contentType]

  if (r.status === 204) return Promise.resolve(undefined)
  if (!parseMethod) return (await r.text())
  if (parseMethod === "json") return await r.json()

  return await r.blob()
}
