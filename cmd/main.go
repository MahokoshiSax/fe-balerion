package main

import (
	"fmt"
	"fe-balerion/pkg/thai-currency"
	"github.com/shopspring/decimal"
)
func main() {
	inputs := []decimal.Decimal{
		decimal.NewFromFloat(1234),
		decimal.NewFromFloat(33333.75),
	}
	for _, input := range inputs {
		converter := thai_currency.NewThaiCurrencyConverter()
		fmt.Println(converter.ConvertToThaiText(input))
	}
 }
 