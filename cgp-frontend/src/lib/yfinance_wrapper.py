import yfinance as yf
import sys
import json

def fetch_data(isin):
    try:
        ticker = yf.Ticker(isin)
        info = ticker.info
        result = {
            'isin': isin,
            'name': info.get('longName', 'N/A'),
            'currency': info.get('currency', 'N/A'),
            'price': info.get('currentPrice', 'N/A'),
            'type': info.get('quoteType', 'N/A'),
            'exchange': info.get('exchangeName', 'N/A')
        }
        print(json.dumps(result))  # Output JSON string
    except Exception as e:
        error = {"error": str(e)}
        print(json.dumps(error))  # Output JSON string

if __name__ == "__main__":
    if len(sys.argv) != 2:
        error = {"error": "Usage: python yfinance_wrapper.py <ISIN>"}
        print(json.dumps(error))  # Output JSON string
    else:
        isin = sys.argv[1]
        fetch_data(isin)