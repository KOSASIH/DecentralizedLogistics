import pandas as pd
import numpy as np
from sktime.forecasting.arima import ARIMA
from sktime.performance_metrics.forecasting import mae

# Load data into a pandas DataFrame
data = pd.read_csv('bike_data.csv')

# Clean and preprocess the data
data['Created Date'] = pd.to_datetime(data['Created Date'])
data = data.set_index('Created Date')
data = data.resample('M').sum()

# Split the data into training and testing sets
train = data.loc[:'2023-12-31']
test = data.loc['2024-01-01':]

# Create an ARIMA model
model = ARIMA(train, order=(1,1,1))
model_fit = model.fit()

# Make predictions for the testing period
predictions = model_fit.predict(start=len(train), end=len(train)+len(test)-1)

# Evaluate the model using Mean Absolute Error (MAE)
mae_value = mae(test, predictions)
print(f'Mean Absolute Error: {mae_value:.2f}')

# Plot the actual vs predicted demand
import matplotlib.pyplot as plt

plt.figure(figsize=(12,5))
plt.plot(test, label='Actual')
plt.plot(predictions, label='Predicted')
plt.title('Demand Forecasting Model')
plt.xlabel('Month')
plt.ylabel('Demand')
plt.legend()
plt.show()
