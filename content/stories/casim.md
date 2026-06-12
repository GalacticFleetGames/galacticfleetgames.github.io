---
title: A Living World: Rewriting CASIM in Rust
brief: How rewriting CASIM in Rust enabled the game's core design to come to life.
order: 4
draft: true
---

## How we rebuilt the heart of a large scale MMO in Rust — and made the world itself the game:

One of our biggest projects with our long-term partner is working on a large-scale MMO RPG which is currently in early access. Since the very start of the project, the core design indicated that the game world should be central to the experience, acting as a key element of gameplay rather than simply a backdrop. A living and evolving world relies on a single piece of technology - CASIM, Cell Automator Simulator.
## What does CASIM DO?
So what does CASIM actually do? CASIM thinks of the world as a 3D grid of cells, and simulates them accordingly. These simulations are recalculated 10 times a second, leading to high fidelity updates. The question then becomes, what gets updated? That is the power of having a strong CASIM system, the list grows as design needs it to. Water flows, pools, and even erodes. Heat rises, melts, and affects materials around it. Objects can fall and slide differently depending on the gravity and other things around them. Our CASIM system is built to support an ever growing game, leading to many unique opportunities for future feature integration and support. The world is such a central element to the game. That is why it is important to create a robust solution and approach rather than a series of patchwork stopgaps.
## The problem we inherited:
When we joined the project, CASIM was written in C#. It worked well for a prototype, but the team had much bigger goals for the simulation.
We needed the system to:
- run at 10 iterations per second consistently
- scale from 128³ worlds to 1024³ and beyond
- reduce memory and garbage collection issues
- stay maintainable as new systems were added
- work across Linux, Mac, and Windows
At a certain point, the prototype had reached its limits. Pushing performance further was becoming more expensive and harder to maintain.
## Why Rust?
We chose Rust for four simple reasons.
Rust gave us:
- Resource management (CPU, memory, threading) without significant or random overhead (garbage collection…)
- significantly better performance
- strong multi-threading support
- easier cross-platform development
None of us were Rust experts when we started. That’s worth saying out loud.
We learned while building, refactored systems multiple times, and improved the architecture as our understanding of the language grew.
That process ended up making the system stronger in the long run.
## The proof, then the build
At that point, a 1024m³ world stopped feeling unrealistic and started feeling achievable. The dream of a large world was slowly becoming the plan. To put this plan into motion, we worked iteratively, writing version after version. First we had a naive approach where we added all the calculations and made the new simulator feature-parity to the C# one. Then we started optimizing iteratively. With everything improving, the goal of a 1024³  world became a reality. We had seen this coming even at the early test runs, when we just measured one algorithm on the new and old systems, we saw even 10.000 times faster calculations.
## Getting data out without slowing the simulation down
A fast simulation isn't worth much if nothing else can be read from it. The next challenge was serving CASIM's data to the consumer services without dragging the simulation's pace down.
The fix had two parts. First, we restructured how CASIM uses memory and CPU cores so that simulation work and data-serving work don't block each other. Second, instead of pushing the entire world state to consumers, we send deltas — only what changed since last iteration. The network layer became as much of a design problem as the simulation itself, and ended up being one of the most efficient pieces of the system.
## Where we landed
The rewrite gave us:
- 1024m³ simulated worlds running at 10 iterations per second
- a cleaner and more extendable simulation framework
- multi-threaded optimization across cores
- full cross-platform support
- a lightweight networking layer for world updates
It also made adding new systems significantly easier. Gas simulation, for example, was added later as a test of how flexible the architecture had become.
## The bonus we didn't fully see coming
Originally, the plan was for CASIM to communicate with Unity through external services. But because Rust supports so many targets, we were able to compile client binaries that run directly inside Unity itself. That moved a major part of the project away from Unity’s runtime limitations and onto a faster, more memory-efficient foundation. Sometimes a good technical decision solves more problems than you originally planned for.
## What this means for partners
For studios interested in simulation-driven worlds, worlds that actively behave instead of simply looking good, this kind of technology is becoming more achievable than ever before. The tools have matured, the workflows are improving, and the path from experimentation to production is much more realistic than it used to be.
CASIM became the backbone of this MMO, but the bigger idea goes beyond a single project. We believe simulation is slowly becoming a much larger part of how games are designed, experienced, and remembered by players.
These are the kinds of technical and creative challenges we genuinely enjoy solving. If your team is exploring similar ideas, building ambitious systems, or looking for support during difficult production moments, we would love to talk and see where we could help.
