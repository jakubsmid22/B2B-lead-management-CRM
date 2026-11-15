export interface Lead {
    id: number,
    name: string,
    email: string,
    phoneNumber: string,
    status: "NEW" | "CONTACTED" | "QUALIFIED" | "WON" | "LOST",
    createdAt: string
}

export interface PageResponse {
    content: Lead[],
    number: number,
    totalPages: number,
    first: boolean,
    last: boolean
}

export interface Note {
    id: number,
    content: string,
    leadId: number,
    createdAt: string
}