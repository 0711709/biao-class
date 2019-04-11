export default function (row) {
    return row.$user && (row.$user.nickname || row.$user.username);
}