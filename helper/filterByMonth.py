import pandas as pd

# Read the data file
data = pd.read_csv('data/united_states_covid_data.csv')

# Convert the 'Day' column to a datetime type
data['Day'] = pd.to_datetime(data['Day'])

# Extract only the 'Day' and 'Cases' columns
data = data[['Day', 'Cases']]

# Group data by month
data_by_month = data.groupby(pd.Grouper(key='Day', freq='M'))

# Iterate over each group (month) and store it in separate files
for month, month_data in data_by_month:
    month_str = month.strftime('%Y-%m')
    filename = f'data/monthData/{month_str}.csv'

    # Write the data for the month to a separate file
    month_data.to_csv(filename, index=False)

    print(f'Data for {month_str} has been stored in {filename}')
