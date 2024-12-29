# src/lib/yfinance_historical.py
import yfinance as yf
import sys
import json
import logging

def fetch_historical_data(isin: str):
    try:
        ticker = yf.Ticker(isin)
        hist = ticker.history(period="1y")
        prices = [{"date": str(date), "close": row["Close"]} for date, row in hist.iterrows()]

        result = {
            "isin": isin,
            "prices": prices
        }
        
        return result
        
    except Exception as e:
        logging.error(f"Error fetching historical data for ISIN {isin}: {str(e)}")
        return {"error": f"Failed to fetch historical data for ISIN {isin}: {str(e)}"}

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "ISIN argument required"}))
        sys.exit(1)

    isin = sys.argv[1]
    result = fetch_historical_data(isin)
    print(json.dumps(result))