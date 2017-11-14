# Elixir-Cli (youtube)

> An example CLI for Elixir (opera, chrome) extension.

## Installation

Use `setup.sh` to install the CLI with ease. You also can add `--help` option. After that, you can use it anywhere in the Terminal.

```bash
$ git clone https://github.com/loouislow81/elixir-cli.git
$ cd elixir-cli
$ ./setup.sh --install
```

## Usage

Option `-l` is to fetch only low-Q video, without the `-l` is high-Q video. Option `-b` is set bitrate (max. 320 kbps) in MP3 format.

```bash
$ elixir-cli -l -b 320 <youtube_url>
```

Example,

```bash
$ elixir-cli -l -b 320 https://www.youtube.com/watch?v=Z2rSGq7KxLo
```

Terminal Output,

```text
Elixir-Cli (v1.2.1)

Fetching > Metadata:	[////////////////////] 100% in 0.0s bitrate: 50kbps
Downloading > Video	[////////////////////] 100% @ 62.1 kB/s (1.62 MB/1.62 MB)
Transcoding > MP3	[////////////////////] 100% @ 320.1kbps in 36.1s

```
