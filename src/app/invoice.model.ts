export interface Invoice {
    customerName: string;
    numberOfHours: number;
    startDate: Date;
    endDate: Date;
    hourlyRate: number;
    tax: number;
}