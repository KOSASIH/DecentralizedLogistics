import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator

def image_recognition_model(model_name, train_dir, test_dir, batch_size, epochs):
    # Load the training and testing datasets using ImageDataGenerator
    train_datagen = ImageDataGenerator(rescale =1./255,
                                       zoom_range = 0.2,
                                       horizontal_flip = True)

    training_set = train_datagen.flow_from_directory(
        train_dir,
        target_size = (64, 64),
        batch_size = batch_size,
        class_mode = 'binary')

    test_datagen = ImageDataGenerator(rescale = 1./255)

    test_set = test_datagen.flow_from_directory(
        test_dir,
        target_size = (64, 64),
        batch_size = batch_size,
        class_mode = 'binary')

    # Define the CNN model
    cnn = tf.keras.models.Sequential()

    cnn.add(tf.keras.layers.Conv2D(filters=5, kernel_size=3, activation='relu',
                                    input_shape=[64, 64, 3]))

    cnn.add(tf.keras.layers.MaxPool2D(pool_size=2, strides=2))

    cnn.add(tf.keras.layers.Conv2D(filters=32, kernel_size=3, activation='relu'))

    cnn.add(tf.keras.layers.MaxPool2D(pool_size=2, strides=2))

    cnn.add(tf.keras.layers.Flatten())

    cnn.add(tf.keras.layers.Dense(units=128, activation='relu'))

    cnn.add(tf.keras.layers.Dense(units=1, activation='sigmoid'))

    # Compile the CNN model
    cnn.compile(optimizer = 'adam', loss = 'binary_crossentropy', metrics = ['accuracy'])

    # Train the CNN model
    cnn.fit(x = training_set, validation_data = test_set, epochs = epochs)

    return cnn, training_set, test_set

# Example usage
model_name = 'my_image_recognition_model'
train_dir = 'dataset/train_set'
test_dir = 'dataset/test_set'
batch_size = 32
epochs = 5

model, training_set, test_set = image_recognition_model(model_name, train_dir, test_dir, batch_size, epochs)
