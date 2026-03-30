const BASE_URL = 'https://vpic.nhtsa.dot.gov/api'

export interface DecodeResult {
  Value: string | null
  ValueId: string | null
  Variable: string
  VariableId: number
}

export interface DecodeResponse {
  Results: DecodeResult[]
  Message: string
  SearchCriteria: string
}

export interface VehicleVariable {
  ID: number
  Name: string
  Description: string
  DataType: string
  GroupName: string | null
}

export interface VariablesResponse {
  Results: VehicleVariable[]
  Count: number
}

export async function decodeVin(vin: string): Promise<DecodeResponse> {
  const res = await fetch(`${BASE_URL}/vehicles/decodevin/${encodeURIComponent(vin)}?format=json`)
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  return res.json() as Promise<DecodeResponse>
}

export async function getVariableList(): Promise<VariablesResponse> {
  const res = await fetch(`${BASE_URL}/vehicles/getvehiclevariablelist?format=json`)
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  return res.json() as Promise<VariablesResponse>
}
