FROM amazonlinux:2

# Instalasi Python
RUN yum install -y python37 && \
    yum install -y python3-pip && \
    yum install -y zip && \
    yum clean all

# Set up PIP dan Virtual Environment
RUN python3.7 -m pip install --upgrade pip && \
    python3.7 -m pip install virtualenv
RUN python3.7 -m venv base
RUN source base/bin/activate

# Install dependencies kebutuhan app
COPY ./kebutuhan.txt .
RUN pip install -r kebutuhan.txt -t ./python

# Compress untuk deploy.
RUN zip -r layer.zip ./python/
ENTRYPOINT ["/bin/bash", "-l"]