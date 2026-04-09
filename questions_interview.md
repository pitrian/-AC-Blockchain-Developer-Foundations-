1. Ethereum smart contract là gì?
    -là các ứng dụng nhỏ chạy trên blockchain eth thông qua thành phần evm-ethereum virtual machine.
2. Điều đặc biệt nhất của smart contract là gì?
    -là khi đả deploy lên blockchain thì không ai được thay đổi sourcecode của nó, thậm chí là người tác giả viết ra smc đó cung không có quyền thay đổi; và khi smc đả chạy thì không một chính phủ hay một tổ chức nào có thể nhảy vô mà bắt nó dừng được; và nó cứ vậy chạy thôi.
3. Có thể gọi một smart contract từ một smart contract khác không?
    -tất nhiên là được, thực ra đây chính là điểm mạnh nhất của smc; có nghỉa là một smc có thể gọi được một smc khác và 1 cái smc khác lại có thể giao tiếp được với 1 cái smc khác nửa; do đó mình có thể gửi một cái transaction, mình gọi 1 cái hàm ở trong smc của mình và mình có thể tạo ra nguyên một
    cái phản ứng dây chuyền trong blockchain bằng cách là gọi liên tục các cái hàm của các smc khác.
4. Từ một smc có thể gọi được một API bên ngoài không?
    - không được, về bản chất một smc không thể gọi được một cái API ở bên ngoài, thế thì muốn lấy được dử liệu từ off chain hoặc onchain thì mình phải sử dụng cái oracle pade, mà cái công ty mà cung cấp oracle pade rất nổi tiếng là chainlink;
    cái cách làm việc của nó là nó sẻ giới thiệu các dử liệu ở phía bên ngoài vào trong blockchain thông qua các internal transaction và chỉ là một hướng oracle lấy dl từ bên ngoài và giói thiệu vào trong blockchain thông qua internal transaction chứ không bao giờ đi được cái hướng ngc lại là smc gọi ra ngoài API để lấy dl vào trong blockchain.
5. SMC có lưu nhiều dử liệu không?
    -thường là không, tại vì khi mình lưu dư liệu ở trên blockchain thì mình phải trả một cái phí giao dịch gọi là phí gas; và dư liệu càng lớn thì phí gas sẻ càng mắc; do đó mà smc người ta se không lưu nhiều dl ở trong đó.
6. Ngôn ngử nào thường được đùng dể code smc?
    -solidity, rust, haskkell, vibe..nhưng mà cho dù viết bằng ngôn ngư gì đi chăng nửa thì sau khi mà compile thì nó sẻ compile ra evm bytecode-1 seri operation code mà evm nó có thể hiểu được.
7. Có thể code nhiều smc trong cùng 1 file không?
    -Được, mình chỉ càn định nghỉa cái từ khóa contract nhiều lần trong cùng 1 file solidity.
8. Solidity là stactic-type hay dynamic-type?
    -là static-type; stactic nghỉa là mình phải định nghỉa kiểu dử liệu của một cái biến trước khi mình sài nó; khác với javascript thì mình chỉ cần định nghỉa cái biến đó và cái ngôn ngử nó sẻ quyết định là cái biến đó sẻ có dử liệu gì.
9. Bạn dùng công cụ nò để coi và lấy dử liệu blockchain?
    -mình sẻ coi tất cả nhửng thông tin thông qua block esplorer; đa phần tất cả các blockchain nó đều có một cái block esplorer riêng mà cái block esplorer đó sẻ bao gồm toàn bộ thông tin về các transaction ở trên bl đó; thậm chí một số bl esplorer nó còn có API để mà mình muốn build cái tools mình lấy dl một cách tỉ mỉ metically thì mình cung có thể sài được cái API đó.
10. ABI là gì?
    -applicatin binary interface; sinh ra sau khi compile một smc; ns chính là cái signatures của smc; nó sẻ chứa các thông tin như là cái hàm đó cái thông số nhận vào của ns là nhửng thông số nào, cái kiểu dl của thông số đó ntn, và cái dl trả ra của hàm đó là gì, và có cái kiểu dl gì; cái ABI nó sẻ được dùng bởi các thư viện của bên thứ 3 như web3.js hay ethers.js để nó giao tiếp với smc.