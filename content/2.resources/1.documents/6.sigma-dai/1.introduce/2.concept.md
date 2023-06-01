---
title: Concepts
order: 2
---
# Related concepts
The following is the overview of the concepts used throughout the Guide to Use SSAI.
## Advertising insert concept
The following is the overview of the concepts related to the inserts.

### Advertising Server (ADS)
A server provides the specifications of the advertising point based on criteria including current advertising campaigns and viewer preferences.

### Configure (Configuration)
An object in the SSAI you interact with. The configuration contains location information about the original server and the advertising decision server (ADS). The configuration also contains endpoints that provide access points in and out of the SSAI.

### Dynamic transcoding
A process matching process and advertising format with the main video content when content is required. The transfer code helps reduce the storage requirement and ensure that the rebroadcast process will be seamless between advertising and video content.

### Index manifold (Manifest)
The process of rewriting the index files from the root server so that the manifest files references the appropriate content and advertising sections. The ad is determined by VAST feedback from the ad server (ADS). When the process is rebroadcast, the SSAI performs an ad inserts or promotional replacement into the content stream.

### VAST and VMAP
The video advertising distribution (VAST) and a list of video ads (VMAP) are the XML responses that the server decides to advertise to advertisements from the SSAI. The answers indicate the ads that SSAI inserted into the manifest file. VMAP also includes time for promotional broadcast schedules. For more information about the logic behind the inserts of the SSAI advert, see Learn about the behavior of SSAI's advertising inserts. For more information on how SSAI works with VAST, see the VAST, VMAP and VPAID requirements for the ad server.
## Channel configuration concept
The following is the overview of the concepts related to the channel configuration.

### Channel (Channels)
A channel that sets your source index into a linear stream. Each channel has one or more outputs containing the rebroadcast URLs that the player accusers. The channel output corresponds to the package configuration settings that you create for your VOD sources. A scheduled channel that determines the time the VOD sources will stream in the channel's flow.

### Package configuration (Package configuration)
The package-packing configuration is representative of the VOD source that contains specific packaging format characteristics. You link your packaging configuration with the channel output to generate a rebroadcast for the packaging format of the VOD source, such as HLS.


### Source locations
The source location represents the root server where your contents are stored. It can be the Amazon S3, HTTP server, content distribution network or packaging infrastructure like MediaPackage.

### VOD source (VOD sources)
The VOD source represents part of the content, such as the film or episode of the television show. You link VOD sources with programs to add them to the linear flow of the channel.