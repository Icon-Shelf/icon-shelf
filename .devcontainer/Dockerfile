# [Choice] Node.js version (use -bullseye variants on local arm64/Apple Silicon): 18, 16, 14, 18-bullseye, 16-bullseye, 14-bullseye, 18-buster, 16-buster, 14-buster
ARG VARIANT=16-bullseye
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
  && apt-get -y upgrade \
  && apt-get -y install --no-install-recommends git nano openssl libnss3-dev chromium zsh \
  && apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/* /root/.gnupg /tmp/library-scripts

RUN chsh -s $(which zsh) root \
  && chsh -s $(which zsh) node

# Clone a sample repos with svg icons in it
RUN cd /home/node && git clone https://github.com/Remix-Design/RemixIcon.git
RUN cd /home/node && git clone https://github.com/tailwindlabs/heroicons.git

EXPOSE 3000
EXPOSE 5901
EXPOSE 6080

# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# [Optional] Uncomment if you want to install more global node modules
# RUN su node -c "npm install -g <your-package-list-here>"
