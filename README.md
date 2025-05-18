# fe-balerion

A modern web application built with Bun, the fast all-in-one JavaScript runtime and toolkit.

## 🚀 Features

- ⚡️ Lightning fast development with Bun
- 🛠️ Built-in bundler, test runner, and package manager
- 📦 Zero-config TypeScript support
- 🔥 Hot module replacement (HMR)
- 🎯 Production-ready builds

## 📋 Prerequisites

- [Bun](https://bun.sh) (v1.0.0 or later)
- [Go](https://golang.org) (v1.21 or later) - Required for Thai currency converter

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/fe-balerion.git
cd fe-balerion
```

2. Install dependencies:
```bash
bun install
```

3. Install Go dependencies:
```bash
go mod download
```

## 🚀 Development

Start the development server:
```bash
bun run dev
```

The application will be available at `http://localhost:3000`


### For ASSIGNMENT Backend Test Thai Currency Converter Tests
The project includes a Thai currency converter package that converts decimal values to Thai text with currency formatting. To run the tests for this package:

1. Navigate to the package directory:
```bash
cd pkg/thai-currency
```

2. Run the tests:
```bash
go test -v
```

OR

1. Go to cmd/main.go

2. run the code

Example test cases:
```go
// Zero
0 -> "ศูนย์บาทถ้วน"

// Whole number
1234 -> "หนึ่งพันสองร้อยสามสิบสี่บาทถ้วน"

// With satang
1234.56 -> "หนึ่งพันสองร้อยสามสิบสี่บาทห้าสิบหกสตางค์"

// Large number
1000000 -> "หนึ่งล้านบาทถ้วน"

// Decimal only
0.50 -> "ศูนย์บาทห้าสิบสตางค์"

// Special case
21 -> "ยี่สิบเอ็ดบาทถ้วน"
```

### FOR Front-end test ASSIGNMENT 2 path is /assign-2


## 📝 Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run test` - Run tests
- `bun run lint` - Run linter
- `bun run format` - Format code

## 📚 Project Structure

```
fe-balerion/
├── src/           # Source files
├── public/        # Static assets
├── tests/         # Test files
├── pkg/           # Go packages
│   └── thai-currency/  # Thai currency converter
├── bun.lockb      # Bun lock file
├── go.mod         # Go module file
└── package.json   # Project configuration
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Bun](https://bun.sh) - The JavaScript runtime & toolkit
- [Go](https://golang.org) - The Go programming language
- All contributors who have helped shape this project