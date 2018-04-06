# Chlu Explorer

The Chlu Explorer is a Web Application for inspecting and linking [Chlu](https://chlu.io) data
and analyzing the current state of the network.

[Try an experimental build](https://ipfs.io/ipfs/QmYTB3zg8DFWsKVHSGbcYUxTJ2LDgKPWBu99yfZstodPU1), no download required!

### Screenshots

![Home](https://ipfs.io/ipfs/QmWxrHi3rhEAaFDzoppgPuPFFQd2CsViwZ8wbpb53zFdku/home.png)
![Review](https://ipfs.io/ipfs/QmWxrHi3rhEAaFDzoppgPuPFFQd2CsViwZ8wbpb53zFdku/review.png)

### How it works

The Explorer runs a Chlu Service Node in your browser tab when you load it. In a couple
of seconds, it is able to start replicating the latest Chlu reviews and provides an
interface to navigate and inspect them.

The Explorer does not need any backend infrastructure to work and connects directly to
the Chlu peer to peer network: it is just a static web application hosted on IPFS.

# Hacking

The explorer is a react application created using create-react-app

- install dependencies with `yarn`
- start a development server using `yarn start`
- create a production build using `yarn build`