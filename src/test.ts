import { UserHandlerTest } from "./test/test_UserHandler";
import { RoleHandlerTest } from "./test/test_RoleHandler";
//import { timezones_to_db } from "./test/timezone_to_db";
import { AttributeHandlerTest } from "./test/test_AttributeHandler";
import { TimezoneHandlerTest } from "./test/test_TimezoneHandler";
import { PinHandlerTest } from "./test/test_PinHandler";
import { HostHandlerTest } from "./test/test_HostHandler";
import { UtilTableTest } from "./test/test_UtilTable";
import BotTest from "./test/test_bot";
import { promisify } from "util";

const userHandlerTest = new UserHandlerTest;
const roleHandlerTest = new RoleHandlerTest;
const attributeHandlerTest = new AttributeHandlerTest;
const timezoneHandlerTest = new TimezoneHandlerTest;
const pinHandlerTest = new PinHandlerTest;
const hostHandlerTest = new HostHandlerTest;
const utilTableTest = new UtilTableTest;
const botTest = new BotTest;


// const time = new timezones_to_db();
// time.run();


const userHandlerTestFail = userHandlerTest.run();
const roleHandlerTestFail = roleHandlerTest.run();
const attributeHandlerTestFail = attributeHandlerTest.run();
const timezoneHandlerTestFail = timezoneHandlerTest.run();
const pinHandlerTestFail = pinHandlerTest.run();
const hostHandlerTestFail = hostHandlerTest.run();
const utilTableTestFail = utilTableTest.run();

console.log('');
console.log(`SERVER SPECIFIC CLASSES TESTS BEGIN`);
console.log('=================================================================================');
console.log(`\nUserHandler class Test finished with: ${userHandlerTestFail} failed test(s)`); //TODO: Add tests to handle drop empty table
console.log('=================================================================================');
console.log(`\nRoleHandler class Test finished with: ${roleHandlerTestFail} failed test(s)`); //TODO: ^
console.log('=================================================================================');
console.log(`\nAttributeHandler class Test finished with: ${attributeHandlerTestFail} failed test(s)`);
console.log('=================================================================================');
console.log(`\nTimezoneHandler class Test finished with: ${timezoneHandlerTestFail} failed test(s)`);
console.log('=================================================================================');
console.log(`\nPinHandler class Test finished with: ${pinHandlerTestFail} failed test(s)`);
console.log('=================================================================================');
console.log(`\nHostHandler class Test finished with: ${hostHandlerTestFail} failed test(s)`);
console.log('=================================================================================');
console.log('');
console.log('=================================================================================');
console.log(`UTIL SPECIFIC CLASSES TESTS BEGIN`);
console.log('=================================================================================');
console.log(`\nTable class Test finished with: ${utilTableTestFail} failed test(s)`);
console.log('');
console.log('=================================================================================');
console.log(`BOT FEATURES TESTS BEGIN`);
console.log('=================================================================================');

botTest.run()