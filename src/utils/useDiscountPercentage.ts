import { useState } from "react"

export const useDiscountPercentage = (percentage: number, Price: number) => {
    const discount = percentage * Price

    const total = Price - discount;

    return total
}