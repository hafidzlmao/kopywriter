# Men-generate sebyah baselayer untuk Lambda functions.

# Hapus container (jika ada).
docker rm layer-container

# Build baselayer.
docker build -t base-layer .

# Rename ke layer-container.
docker run --name layer-container base-layer

# Copy zip file untuk CDK.
docker cp layer-container:layer.zip . && echo "layer.zip telah dibuat dengan versi baru."