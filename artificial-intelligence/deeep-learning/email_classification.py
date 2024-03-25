import spacy
import pandas as pd
from sklearn.model_selection import train_test_split

def email_classification(train_df):
    # Load the spaCy model
    nlp = spacy.load('en_core_web_sm')

    # Add custom labels to the spaCy model
    nlp.add_pipe('entity_ruler', after='parser')
    ruler = nlp.get_pipe('entity_ruler')
    patterns = [{'label': 'SPAM', 'pattern': [{'LOWER': 'spam'}, {'POS': 'PUNCT'}, {'LOWER': 'or'}]},
                {'label': 'NOT_SPAM', 'pattern': [{'LOWER': 'not'}, {'LOWER': 'spam'}]},
                {'label': 'NOT_SPAM', 'pattern': [{'LOWER': 'important'}]},
                {'label': 'NOT_SPAM', 'pattern': [{'LOWER': 'urgent'}]},
                {'label': 'NOT_SPAM', 'pattern': [{'LOWER': 'ham'}]},
                ]
    ruler.add_patterns(patterns)

    # Define the email classification function
    def classify_email(text):
        doc = nlp(text)
        spam_count = sum(1 for ent in doc.ents if ent.label_ == 'SPAM')
        if spam_count > 0:
            return 'SPAM'
        else:
            return 'NOT_SPAM'

    # Apply the classification function to the training data
    train_df['label'] = train_df['text'].apply(classify_email)

    # Prepare the data for training
    X = train_df['text'].values
    y = train_df['label'].values
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    return X_train, y_train, X_test, y_test

# Example usage
train_df = pd.read_csv('email_train_data.csv')
X_train, y_train, X_test, y_test = email_classification(train_df)
