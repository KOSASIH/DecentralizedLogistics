import pandas as pd
from sklearn.stats import norm

class InventoryForecasting:
    def __init__(self, data, alpha=0.1, lambda_=0.1, initial_stock=0, service_level=0.95):
        self.data = data
        self.alpha = alpha
        self.lambda_ = lambda_
        self.initial_stock = initial_stock
        self.service_level = service_level
        self.forecast = self.forecast_inventory()

    def forecast_inventory(self):
        # Calculate the mean and standard deviation of the data
        mu, sigma = self.data.mean(), self.data.std()

        # Calculate the initial forecast based on the mean of the data
        forecast = [mu]

        # Use a moving window to calculate new forecasts
        for i in range(1, len(self.data)):
            # Calculate the mean and standard deviation of the past 'window' values
            window_data = self.data.iloc[i - self.window:i]
            window_mu, window_sigma = window_data.mean(), window_data.std()

            # Calculate the probability of a shortage
            z = (self.initial_stock - window_mu) / window_sigma
            p_shortage = 1 - norm.cdf(z)

            # Calculate the adjustment factor based on the probability of a shortage
            beta = (self.lambda_ * (1 - p_shortage) + self.alpha * p_shortage) if p_shortage > self.service_level else 0

            # Calculate the new forecast
            forecast.append(window_mu + beta * (self.data.iloc[i] - window_mu))

        return forecast

# Example usage
data = pd.Series(data=[100, 102, 105, 98, 95, 100, 105, 102, 108, 100])
inventory_forecasting = InventoryForecasting(data, window=3)
forecast = inventory_forecasting.forecast
print(forecast)
