import csv

# Open the existing CSV file and the new CSV file
with open('daily-covid-cases-deaths.csv', 'r') as file, open('new_file.csv', 'w', newline='') as new_file:
    reader = csv.reader(file)
    writer = csv.writer(new_file)
    
    header = next(reader)  # Read the header row
    writer.writerow(header)  # Write the header to the new file
    
    # Find the index of the column containing the country information
    country_index = header.index('Country')
    
    # Iterate over each row in the existing CSV file
    for row in reader:
        # Check if the country value in the row is 'United States'
        if row[country_index] == 'United States':
            writer.writerow(row)  # Write the row to the new file
