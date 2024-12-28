# src/lib/yfinance_wrapper.py
import yfinance as yf
import sys
import json

def fetch_fund_data(isin: str):
    try:
        ticker = yf.Ticker(isin)
        info = ticker.info
        
        def parse_numeric(value):
            return None if value == "N/A" else value

        result = {
            "isin": isin,
            "longName": info.get("longName", "N/A"),
            "shortName": info.get("shortName", "N/A"),
            "symbol": info.get("symbol", "N/A"),
            "currency": info.get("currency", "N/A"),
            "exchange": info.get("exchange", "N/A"),
            "quoteType": info.get("quoteType", "N/A"),
            "regularMarketPrice": parse_numeric(info.get("regularMarketPrice", "N/A")),
            "regularMarketOpen": parse_numeric(info.get("regularMarketOpen", "N/A")),
            "regularMarketDayHigh": parse_numeric(info.get("regularMarketDayHigh", "N/A")),
            "regularMarketDayLow": parse_numeric(info.get("regularMarketDayLow", "N/A")),
            "regularMarketVolume": parse_numeric(info.get("regularMarketVolume", "N/A")),
            "marketCap": parse_numeric(info.get("marketCap", "N/A")),
            "previousClose": parse_numeric(info.get("previousClose", "N/A")),
            "fiftyTwoWeekHigh": parse_numeric(info.get("fiftyTwoWeekHigh", "N/A")),
            "fiftyTwoWeekLow": parse_numeric(info.get("fiftyTwoWeekLow", "N/A")),
            "trailingPE": parse_numeric(info.get("trailingPE", "N/A")),
            "forwardPE": parse_numeric(info.get("forwardPE", "N/A")),
            "priceToBook": parse_numeric(info.get("priceToBook", "N/A")),
            "dividendYield": parse_numeric(info.get("dividendYield", "N/A")),
            "dividendRate": parse_numeric(info.get("dividendRate", "N/A")),
            "earningsGrowth": parse_numeric(info.get("earningsGrowth", "N/A")),
            "revenueGrowth": parse_numeric(info.get("revenueGrowth", "N/A")),
            "grossMargins": parse_numeric(info.get("grossMargins", "N/A")),
            "operatingMargins": parse_numeric(info.get("operatingMargins", "N/A")),
            "profitMargins": parse_numeric(info.get("profitMargins", "N/A")),
            "totalRevenue": parse_numeric(info.get("totalRevenue", "N/A")),
            "grossProfits": parse_numeric(info.get("grossProfits", "N/A")),
            "ebitda": parse_numeric(info.get("ebitda", "N/A")),
            "netIncomeToCommon": parse_numeric(info.get("netIncomeToCommon", "N/A")),
            "totalCash": parse_numeric(info.get("totalCash", "N/A")),
            "totalDebt": parse_numeric(info.get("totalDebt", "N/A")),
            "freeCashflow": parse_numeric(info.get("freeCashflow", "N/A")),
            "sector": info.get("sector", "N/A"),
            "industry": info.get("industry", "N/A"),
            "fullTimeEmployees": parse_numeric(info.get("fullTimeEmployees", "N/A")),
            "website": info.get("website", "N/A"),
            "address1": info.get("address1", "N/A"),
            "city": info.get("city", "N/A"),
            "state": info.get("state", "N/A"),
            "zip": info.get("zip", "N/A"),
            "country": info.get("country", "N/A"),
            "phone": info.get("phone", "N/A"),
            "beta": parse_numeric(info.get("beta", "N/A")),
            "enterpriseValue": parse_numeric(info.get("enterpriseValue", "N/A")),
            "averageDailyVolume10Day": parse_numeric(info.get("averageDailyVolume10Day", "N/A")),
            "averageDailyVolume3Month": parse_numeric(info.get("averageDailyVolume3Month", "N/A"))
        }
        
        return result
        
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "ISIN argument required"}))
        sys.exit(1)
    
    isin = sys.argv[1]
    result = fetch_fund_data(isin)
    print(json.dumps(result))