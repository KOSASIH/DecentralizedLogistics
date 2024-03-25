import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

def data_visualization(data):
    # 1. Distribution Plots
    sns.histplot(data['variable1'])
    plt.title('Distribution of variable1')
    plt.show()

    sns.histplot(data['variable2'])
    plt.title('Distribution of variable2')
    plt.show()

    # 2. Box Plots
    sns.boxplot(x='variable1', y='variable3', data=data)
    plt.title('Boxplot of variable1 vs variable3')
    plt.show()

    sns.boxplot(x='variable2', y='variable3', data=data)
    plt.title('Boxplot of variable2 vs variable3')
    plt.show()

    # 3. Scatter Plots
    sns.scatterplot(x='variable1', y='variable3', data=data)
    plt.title('Scatterplot of variable1 vs variable3')
    plt.show()

    sns.scatterplot(x='variable2', y='variable3', data=data)
    plt.title('Scatterplot of variable2 vs variable3')
    plt.show()

    # 4. Heatmaps
    correlation_matrix = data.corr()
    sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm')
    plt.title('Correlation Matrix')
    plt.show()

    return None

# Example usage:
data = pd.read_csv('my_data.csv')
data_visualization(data)
