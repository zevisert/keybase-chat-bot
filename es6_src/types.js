// @flow

//
// writing classic async JS with flow typing looks pretty ugly and is hard to read when defining the
// types inline. So I figured I'd consolidate some common ones here that follow the cb(err,res) model.
//
// For example, instead of these hard-to-read beasts:
//
//     function a (cb : (err: ?Error, res: ?string) => void) : void {
//     function b (cb : (err: ?Error) => void) : void {
//     function c (arg: string, err : ?Error, res : ?{username: string, devicename: string}) => void) : void {
//
// we can write these:
//
//     function a (cb: CbString) : void {
//     function b (cb: CbError)  : void {
//     function c (cb: CbDeviceUsernamePair) : void {

export type DeviceUsernamePair = {username: string, devicename: string}
export type ChatChannel = {name: string, public: boolean, topic_type: string}
export type ChatSendMessage = {body: string}
export type ChatReadMessage = any

export type CbError = (err: ?Error) => void
export type CbAny = (err: ?Error, res : any) => void
export type CbDeviceUsernamePair = (err : ?Error, res : ?DeviceUsernamePair) => void

export type ApiCommandArg = {method: string, options: Object}
export type MessagesHandler = (arg: {messages: Array<ChatReadMessage>, channel: ChatChannel}) => void
