export interface Tables {
    id:string;
    table_number:string;
    capacity: number;
    status: TableStatus;
}

type TableStatus = "AVAILABLE" | "OCCUPIED" | "RESERVED" | "CLOSED"