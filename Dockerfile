FROM httpd:2.4
RUN \
  apt-get update && \
  apt-get install git -y && \
  ssh-keyscan -t rsa github.com > ~/.ssh/known_hosts
RUN cd /usr/local/apache2/htdocs/ && \
  git clone  https://github.com/vsvipul/GithubUnfollowers.git
