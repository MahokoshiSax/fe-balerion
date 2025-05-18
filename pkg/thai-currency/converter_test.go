package thai_currency

import (
	"testing"

	"github.com/shopspring/decimal"
)

func TestThaiCurrencyConverter_ConvertToThaiText(t *testing.T) {
	tests := []struct {
		name     string
		input    decimal.Decimal
		expected string
	}{
		{
			name:     "Zero",
			input:    decimal.NewFromInt(0),
			expected: "ศูนย์บาทถ้วน",
		},
		{
			name:     "Whole number",
			input:    decimal.NewFromInt(1234),
			expected: "หนึ่งพันสองร้อยสามสิบสี่บาทถ้วน",
		},
		{
			name:     "With satang",
			input:    decimal.NewFromFloat(1234.56),
			expected: "หนึ่งพันสองร้อยสามสิบสี่บาทห้าสิบหกสตางค์",
		},
		{
			name:     "Large number",
			input:    decimal.NewFromInt(1000000),
			expected: "หนึ่งล้านบาทถ้วน",
		},
		{
			name:     "Decimal only",
			input:    decimal.NewFromFloat(0.50),
			expected: "ศูนย์บาทห้าสิบสตางค์",
		},
		{
			name:     "Special case 21",
			input:    decimal.NewFromInt(21),
			expected: "ยี่สิบเอ็ดบาทถ้วน",
		},
	}

	converter := NewThaiCurrencyConverter()

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := converter.ConvertToThaiText(tt.input)
			if result != tt.expected {
				t.Errorf("ConvertToThaiText() = %v, want %v", result, tt.expected)
			}
		})
	}
} 