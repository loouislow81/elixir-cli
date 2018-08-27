# Elixir-Cli (youtube)

> An example CLI for Elixir (opera, chrome) extension.

## Installation

> Prerequisites: nodejs, ffmpeg

Use `setup.sh` to install the CLI with ease. You also can add `--help` option. After that, you can use it anywhere in the Terminal.

```bash
$ git clone https://github.com/loouislow81/elixir-cli.git
$ cd elixir-cli
$ ./setup.sh --install
```

## Test

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

---

MIT License

Copyright (c) 2018 Loouis Low

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
