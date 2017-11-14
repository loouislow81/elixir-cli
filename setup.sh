#!/bin/bash
#
# ---------------------------------------------
#  Elixir-Cli
# ---------------------------------------------
#  @@script: setup.sh
#  @@version:
#  @@description:
#  @@author: Loouis Low
#  @@email: loouis@gmail.com
# ---------------------------------------------
#

binary=$(basename $0)

# typos
blue='\e[94m'
green='\e[92m'
red='\e[91m'
nc='\033[0m'
normal=$(tput sgr0)
title="${blue}[elixir]${nc}"

function runas_root() {
  if [ "$(whoami &2> /dev/null)" != "root" ] &&
  [ "$(id -un &2> /dev/null)" != "root" ]
  then
    echo -e "$title permission denied"
    exit 1
  fi
}

function install_node_modules() {
  if [ -z "$(ls -A $PWD/node_modules/)" ]; then
    echo -e "$title installing > node modules"
    npm i
    chown -cR $USER:$GROUP $PWD/node_modules
  else
    exit 0
  fi
}

function flush_node_modules() {
  if [ -z "$(ls -A $PWD/node_modules/)" ]; then
    exit 0
  else
    echo -e "$title cleaning > node modules"
    chown -cR $USER:$GROUP $PWD/node_modules
    rm -rf $PWD/node_modules
  fi
}

function install_prerequisites() {
  if which curl > /dev/null; then
    echo -e "$title curl > OK"
    install_nodejs
    install_node_modules
    helper
  else
    echo -e "$title installing > prerequisites"
    apt install -y curl
  fi
}

function install_nodejs() {
  if which nodejs > /dev/null; then
    echo -e "$title nodejs > OK"
    helper
  else
    echo -e "$title installing > node.js"
    curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
    apt install -y nodejs
    npm i -g n
    n stable
    echo -e "$title installing > ffmpeg"
    apt install -y ffmpeg
  fi
}

function helper() {
  chmod +x $PWD/cli/elixir.js
  cp $PWD/cli/elixir.js /$PWD/cli/elixir-cli

  if [ -z "$(ls -A /usr/local/bin/elixir-cli)" ]; then
    exit 0
  else
    rm -rf /usr/local/bin/elixir-cli
    echo -e "$title symlink > /usr/local/bin"
    ln -s $PWD/cli/elixir-cli /usr/local/bin/
  fi

  echo -e "$title type: elixir-cli --help"
}

echo -e "$title usage: ./$binary [--help|--install|--clean]"

while test "$#" -gt 0;
do
  case "$1" in
    -h|--help)
    shift
    echo "USAGE:"
    echo "-h, --help          Display this message"
    echo "-i, --install       Setup application"
    echo "-c, --clean         Flush modules"
    exit 0
    shift;;

    -i|--install)
    shift
    runas_root
    install_prerequisites
    install_nodejs
    install_node_modules
    helper
    shift;;

    -c|--clean)
    shift
    flush_node_modules
    shift;;

  esac
done
