import pandas as pd
import os

# List of file names (you can modify this to include all files you want)
files = [
    'blackberries_2013.xlsx', 'blueberries_2013.xlsx', 'raspberries_2013.xlsx',
    'berries_mixed_2013.xlsx', 'pomegranate_2013.xlsx', 'cranberries_2013.xlsx',
    'watermelon_2013.xlsx', 'dates_2013.xlsx', 'mangoes_2013.xlsx', 'figs_2013.xlsx',
    'strawberries_2013.xlsx', 'fruit_cocktail_2013.xlsx', 'plums_2013.xlsx',
    'bananas_2013.xlsx', 'kiwi_2013.xlsx', 'cantaloupe_2013.xlsx', 'honeydew_2013.xlsx',
    'tangerines_2013.xlsx', 'grapefruit_2013.xlsx', 'apricots_2013.xlsx', 'apples_2013.xlsx',
    'peaches_2013.xlsx', 'pears_2013.xlsx', 'cherries_2013.xlsx', 'grapes_2013.xlsx',
    'papaya_2013.xlsx', 'oranges_2013.xlsx', 'nectarines_2013.xlsx'
    
]

# List to store cleaned dataframes
cleaned_data = []

# Iterate over each file
for file in files:
    file_path = os.path.join('./', file)
    
    try:
        # Load the Excel file into a DataFrame
        df = pd.read_excel(file_path)

        # Rename columns (adjust as needed)
        df.columns = ['Fruit', 'Price_per_pound', 'Preparation_yield_factor', 'Cup_size_equivalent', 'Price_per_cup', 'Additional_info_1', 'Additional_info_2']

        # Drop unnecessary columns
        df_cleaned = df.drop(columns=['Additional_info_1', 'Additional_info_2'])

        # Append the cleaned dataframe to the list
        cleaned_data.append(df_cleaned)

        print(f"Successfully cleaned data from {file}")
    except Exception as e:
        print(f"Error processing {file}: {e}")

# Optionally, combine all cleaned data into a single DataFrame
combined_data = pd.concat(cleaned_data, ignore_index=True)

# Print the combined data (first few rows)
print(combined_data.head())

# Optionally, save the combined data to a new Excel file
combined_data.to_excel('combined_fruit_data_2013.xlsx', index=False)
