import { UserHandlerTest } from "./test/test_UserHandler";
import { RoleHandlerTest } from "./test/test_RoleHandler";
//import { timezones_to_db } from "./test/timezone_to_db";
import { AttributeHandlerTest } from "./test/test_AttributeHandler";
import { TimezoneHandlerTest } from "./test/test_TimezoneHandler";
import { PinHandlerTest } from "./test/test_PinHandler";
import { HostHandlerTest } from "./test/test_HostHandler";
import { UtilTableTest } from "./test/test_UtilTable";


const userHandlerTest = new UserHandlerTest;
const roleHandlerTest = new RoleHandlerTest;
const attributeHandlerTest = new AttributeHandlerTest;
const timezoneHandlerTest = new TimezoneHandlerTest;
const pinHandlerTest = new PinHandlerTest;
const hostHandlerTest = new HostHandlerTest;
const utilTableTest = new UtilTableTest;


// const time = new timezones_to_db();
// time.run();


console.log(`SERVER SPECIFIC CLASSES TESTS BEGIN`);
console.log('=================================================================================');
console.log(`\nUserHandler class Test finished with: ${userHandlerTest.run()} failed test(s)`);
console.log('=================================================================================');
console.log(`\nRoleHandler class Test finished with: ${roleHandlerTest.run()} failed test(s)`);
console.log('=================================================================================');
console.log(`\nAttributeHandler class Test finished with: ${attributeHandlerTest.run()} failed test(s)`);
console.log('=================================================================================');
console.log(`\nTimezoneHandler class Test finished with: ${timezoneHandlerTest.run()} failed test(s)`);
console.log('=================================================================================');
console.log(`\nPinHandler class Test finished with: ${pinHandlerTest.run()} failed test(s)`);
console.log('=================================================================================');
console.log(`\nHostHandler class Test finished with: ${hostHandlerTest.run()} failed test(s)`);
console.log('=================================================================================');
console.log(`SERVER SPECIFIC CLASSES TESTS END`);
console.log('=================================================================================');
console.log('');
console.log('=================================================================================');
console.log(`UTIL SPECIFIC CLASSES TESTS BEGIN`);
console.log('=================================================================================');
console.log(`\nTable class Test finished with: ${utilTableTest.run()} failed test(s)`);