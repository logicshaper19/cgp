# src/lib/yfinance_wrapper.py
import yfinance as yf

def fetch_fund_data(isin: str):
    try:
        ticker = yf.Ticker(isin)
        info = ticker.info

        if not info:
            return {"error": f"No data found for ISIN: {isin}"}

        # Prepare the result dictionary
        result = {
            "isin": isin,
            "longName": info.get("longName", "N/A"),
            "shortName": info.get("shortName", "N/A"),
            "symbol": info.get("symbol", "N/A"),
            "currency": info.get("currency", "N/A"),
            "exchange": info.get("exchange", "N/A"),
            "quoteType": info.get("quoteType", "N/A"),
            "regularMarketPrice": info.get("regularMarketPrice", "N/A"),
            "regularMarketOpen": info.get("regularMarketOpen", "N/A"),
            "regularMarketDayHigh": info.get("regularMarketDayHigh", "N/A"),
            "regularMarketDayLow": info.get("regularMarketDayLow", "N/A"),
            "regularMarketVolume": info.get("regularMarketVolume", "N/A"),
            "marketCap": info.get("marketCap", "N/A"),
            "previousClose": info.get("previousClose", "N/A"),
            "fiftyTwoWeekHigh": info.get("fiftyTwoWeekHigh", "N/A"),
            "fiftyTwoWeekLow": info.get("fiftyTwoWeekLow", "N/A"),
            "trailingPE": info.get("trailingPE", "N/A"),
            "forwardPE": info.get("forwardPE", "N/A"),
            "priceToBook": info.get("priceToBook", "N/A"),
            "dividendYield": info.get("dividendYield", "N/A"),
            "dividendRate": info.get("dividendRate", "N/A"),
            "earningsGrowth": info.get("earningsGrowth", "N/A"),
            "revenueGrowth": info.get("revenueGrowth", "N/A"),
            "grossMargins": info.get("grossMargins", "N/A"),
            "operatingMargins": info.get("operatingMargins", "N/A"),
            "profitMargins": info.get("profitMargins", "N/A"),
            "totalRevenue": info.get("totalRevenue", "N/A"),
            "grossProfits": info.get("grossProfits", "N/A"),
            "ebitda": info.get("ebitda", "N/A"),
            "netIncomeToCommon": info.get("netIncomeToCommon", "N/A"),
            "totalCash": info.get("totalCash", "N/A"),
            "totalDebt": info.get("totalDebt", "N/A"),
            "freeCashflow": info.get("freeCashflow", "N/A"),
            "sector": info.get("sector", "N/A"),
            "industry": info.get("industry", "N/A"),
            "fullTimeEmployees": info.get("fullTimeEmployees", "N/A"),
            "website": info.get("website", "N/A"),
            "address1": info.get("address1", "N/A"),
            "city": info.get("city", "N/A"),
            "state": info.get("state", "N/A"),
            "zip": info.get("zip", "N/A"),
            "country": info.get("country", "N/A"),
            "phone": info.get("phone", "N/A"),
            "longBusinessSummary": info.get("longBusinessSummary", "N/A"),
            "beta": info.get("beta", "N/A"),
            "enterpriseValue": info.get("enterpriseValue", "N/A"),
            "averageDailyVolume10Day": info.get("averageDailyVolume10Day", "N/A"),
            "averageDailyVolume3Month": info.get("averageDailyVolume3Month", "N/A")
        }

        return result

    except Exception as e:
        logging.error(f"Error fetching data for ISIN {isin}: {str(e)}")
        return {"error": f"Failed to fetch data for ISIN {isin}: {str(e)}"}