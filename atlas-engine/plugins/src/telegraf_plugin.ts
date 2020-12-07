import {registerEventMiddleware} from '@atlas-engine/fullstack_server';
import Axios, {AxiosRequestConfig} from "../node_modules/axios";

const axiosRequestConfig: AxiosRequestConfig = {headers: {'X-Requested-With': 'XMLHttpRequest'}}

const TELEGRAF_HTTP_LISTENER: string = "http://host.docker.internal:8080/telegraf"


registerEventMiddleware(async (atlasEngineEvent) => {

  const data = {
    eventType: atlasEngineEvent.eventType,
    timestamp: atlasEngineEvent.timestamp,
    processModelId: atlasEngineEvent.processModelId,
    flowNodeId: atlasEngineEvent.flowNodeId,
    flowNodeInstanceId: atlasEngineEvent.flowNodeInstanceId,
    flowNodeType: atlasEngineEvent. flowNodeType,
    processInstanceId: atlasEngineEvent.processInstanceId,
    correlationId: atlasEngineEvent.correlationId,
    logLevel: atlasEngineEvent. logLevel,
    tokenPayload: JSON.stringify(atlasEngineEvent.tokenPayload) ?? 'undefined'
  }

  Axios.post(TELEGRAF_HTTP_LISTENER, data, axiosRequestConfig)
  .then(res => {
    console.log('Response:\n', res)
  })
  .catch(error => {
    console.error('Error:\n', error)
  })
});






