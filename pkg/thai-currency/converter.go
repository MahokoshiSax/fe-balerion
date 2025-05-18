package thai_currency

import (
	"strings"
	"github.com/shopspring/decimal"
)

var thaiNumbers = map[int]string{
	0:  "ศูนย์",
	1:  "หนึ่ง",
	2:  "สอง",
	3:  "สาม",
	4:  "สี่",
	5:  "ห้า",
	6:  "หก",
	7:  "เจ็ด",
	8:  "แปด",
	9:  "เก้า",
	10: "สิบ",
}

type ThaiCurrencyConverter struct{}

func NewThaiCurrencyConverter() *ThaiCurrencyConverter {
	return &ThaiCurrencyConverter{}
}

func (c *ThaiCurrencyConverter) ConvertToThaiText(value decimal.Decimal) string {
	integerPart := value.Floor()
	fractionalPart := value.Sub(integerPart)

	thaiText := c.convertIntegerToThai(integerPart)

	thaiText += "บาท"
	if !fractionalPart.IsZero() {
		satang := fractionalPart.Mul(decimal.NewFromInt(100)).Round(0)
		if !satang.IsZero() {
			thaiText += c.convertIntegerToThai(satang) + "สตางค์"
		}
	} else {
		thaiText += "ถ้วน"
	}

	return thaiText
}

// convertIntegerToThai converts an integer to Thai text
func (c *ThaiCurrencyConverter) convertIntegerToThai(num decimal.Decimal) string {
	if num.IsZero() {
		return thaiNumbers[0]
	}

	var result strings.Builder
	digits := num.String()
	length := len(digits)

	for i := 0; i < length; i++ {
		digit := int(digits[i] - '0')
		position := length - i - 1

		if digit == 0 {
			continue
		}

		if digit == 1 {
			if position == 0 {
				result.WriteString("เอ็ด")
			} else {
				result.WriteString(thaiNumbers[digit])
			}
		} else if digit == 2 && position == 1 {
			result.WriteString("ยี่")
		} else {
			result.WriteString(thaiNumbers[digit])
		}

		switch position {
		case 1:
			result.WriteString("สิบ")
		case 2:
			result.WriteString("ร้อย")
		case 3:
			result.WriteString("พัน")
		case 4:
			result.WriteString("หมื่น")
		case 5:
			result.WriteString("แสน")
		case 6:
			result.WriteString("ล้าน")
		}
	}

	return result.String()
} 
