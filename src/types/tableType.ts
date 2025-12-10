export interface Tables {
    id:string;
    table_number:string;
    capacity: number;
    status: TableStatus;
    location: {
        location:string
    };
}

type TableStatus = "AVAILABLE" | "OCCUPIED" | "RESERVED" | "CLOSED"