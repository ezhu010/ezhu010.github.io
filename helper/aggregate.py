import pandas as pd

# Read the dataset into a pandas DataFrame
df = pd.read_csv('united_states_covid_data.csv')

# Assuming your dataset has a column named 'date' and 'value' that you want to sum
# Convert the 'date' column to datetime type
df['date'] = pd.to_datetime(df['Day'])

# Group the DataFrame by the 'date' column, resampled by month, and sum the 'value' column
monthly_sum = df.groupby(pd.Grouper(key='date', freq='M')).agg({'Cases': 'sum'})

# Print the aggregated sum
print(monthly_sum)
monthly_sum.to_csv('output.csv')

