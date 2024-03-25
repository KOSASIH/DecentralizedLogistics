import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt

def data_analysis(data):
    # Perform exploratory data analysis

    # 1. Variable Identification
    print(f'Data shape: {data.shape}')
    print(f'Number of missing values: {data.isnull().sum().sum()}')
    print(f'Variable types: {data.dtypes}')

    # 2. Univariate Analysis
    sns.histplot(data['variable1'], kde=True)
    plt.title('Distribution of variable1')
    plt.show()
    sns.histplot(data['variable2'], kde=True)
    plt.title('Distribution of variable2')
    plt.show()

    # 3. Bivariate Analysis
    sns.boxplot(x='variable1', y='variable3', data=data)
    plt.title('Boxplot of variable1 vs variable3')
    plt.show()

    # 4. Multicollinearity Analysis
    vif_data = pd.DataFrame()
    vif_data['Variables'] = data.drop(['target_variable'], axis=1).columns
    vif_data['VIF'] = [variance_inflation_factor(data.drop(['target_variable'], axis=1).values, i) for i in range(len(data.drop(['target_variable'], axis=1).columns))]
    print(f'VIF values: {vif_data.round(2)}')

    # 5. Outlier Detection
    print(f'Outliers in target variable: {data[target_variable].value_counts()}')

    # 6. New Variables
    data['weekday_of_order'] = data['order_date'].dt.weekday
    data['weekday_of_shipment'] = data['shipment_date'].dt.weekday

    # 7. Chi-Square Test
    # (Note: This requires a separate function as it depends on the categorical variables present in the dataset)

    # 8. Insights
    # (Note: This also requires separate functions as it depends on the specific business context and data at hand)

    return data

# Example usage:
data = pd.read_csv('my_data.csv')
data_cleaned = data_analysis(data)
