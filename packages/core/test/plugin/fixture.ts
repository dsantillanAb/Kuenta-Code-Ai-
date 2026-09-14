import { AgentV2 } from "@kuenta-devs/core/agent"
import { AISDK } from "@kuenta-devs/core/aisdk"
import { Catalog } from "@kuenta-devs/core/catalog"
import { CommandV2 } from "@kuenta-devs/core/command"
import { Credential } from "@kuenta-devs/core/credential"
import { AppNodeBuilder } from "@kuenta-devs/core/effect/app-node-builder"
import { LayerNodePlatform } from "@kuenta-devs/core/effect/app-node-platform"
import { LayerNode } from "@kuenta-devs/core/effect/layer-node"
import { EventV2 } from "@kuenta-devs/core/event"
import { FileSystem } from "@kuenta-devs/core/filesystem"
import { FSUtil } from "@kuenta-devs/core/fs-util"
import { Integration } from "@kuenta-devs/core/integration"
import { Location } from "@kuenta-devs/core/location"
import { Npm } from "@kuenta-devs/core/npm"
import { PluginV2 } from "@kuenta-devs/core/plugin"
import { Reference } from "@kuenta-devs/core/reference"
import { SkillV2 } from "@kuenta-devs/core/skill"
import { Effect, Layer } from "effect"
import { tempLocationLayer } from "../fixture/location"

const npmLayer = Layer.succeed(
  Npm.Service,
  Npm.Service.of({
    add: () => Effect.succeed({ directory: "", entrypoint: undefined }),
    install: () => Effect.void,
    which: () => Effect.succeed(undefined),
  }),
)

export const PluginTestLayer = AppNodeBuilder.build(
  LayerNode.group([
    FileSystem.node,
    FSUtil.node,
    Location.node,
    Npm.node,
    Credential.node,
    EventV2.node,
    LayerNodePlatform.httpClient,
    PluginV2.node,
    AgentV2.node,
    AISDK.node,
    Catalog.node,
    CommandV2.node,
    Integration.node,
    Reference.node,
    SkillV2.node,
  ]),
  [
    [Location.node, tempLocationLayer],
    [Npm.node, npmLayer],
  ],
)
