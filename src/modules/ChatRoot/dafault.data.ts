import {MessageStoreTypes} from "./Store/Types/message.t";
import {PublicMessageInteraction} from "./Methods/IM/types/_message";
import MessageForContentChart = PublicMessageInteraction.MessageForContentChart;

export const DefaultAvatarList: string[] = [
    'https://bossfs.sammbo.com/0/1/head/honeybee.png?x-oss-process=image/resize,m_mfit,h_250,w_250',
    'https://bossfs.sammbo.com/0/1/head/chick.png?x-oss-process=image/resize,m_mfit,h_250,w_250',
    'https://bossfs.sammbo.com/0/1/head/dog.png?x-oss-process=image/resize,m_mfit,h_250,w_250',
    'https://bossfs.sammbo.com/0/1/head/fox.png?x-oss-process=image/resize,m_mfit,h_250,w_250',
    'https://bossfs.sammbo.com/0/1/head/goose.png?x-oss-process=image/resize,m_mfit,h_250,w_250',
    'https://bossfs.sammbo.com/0/1/head/penguin.png?x-oss-process=image/resize,m_mfit,h_250,w_250',
    'https://bossfs.sammbo.com/0/1/head/redcat.png?x-oss-process=image/resize,m_mfit,h_250,w_250',
    'https://bossfs.sammbo.com/0/1/head/yellowcat.png?x-oss-process=image/resize,m_mfit,h_250,w_250',
];

export const DefaultMessageList: MessageStoreTypes['MessageMap'] = {};

export const DefaultUserList = {
    'A_8589934611': {
        name: '兔小虾',
        news: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
        avatar: DefaultAvatarList[1],
        time: '10:10',
        id: 'A_8589934611'
    },
    'A_8589934612': {
        name: '汪大称',
        news: 'Emmm~',
        avatar: DefaultAvatarList[2],
        time: '10:11',
        id: 'A_8589934612'
    },
    'A_8589934613': {
        name: '炫小银',
        news: 'biu～',
        avatar: DefaultAvatarList[3],
        time: '10:12',
        id: 'A_8589934613'
    },
    'A_8589934614': {
        name: '张大葱',
        news: 'duang～',
        avatar: DefaultAvatarList[4],
        time: '10:13',
        id: 'A_8589934614'
    },
    'A_8589934616': {
        name: '梅菜饼',
        news: 'yooooo~',
        avatar: DefaultAvatarList[5],
        time: '10:18',
        id: 'A_8589934616'
    },
    'A_8589934618': {
        name: '掏钱猛',
        news: 'haaaaa~',
        avatar: DefaultAvatarList[6],
        time: '10:19',
        id: 'A_8589934618'
    },
}
export const DefaultMessageItemEnum: { image: MessageForContentChart['1'], video: MessageForContentChart['3'] } = {
    image: {
        format: 0, // 0 png  1 jpg
        imageList: [
            {
                url: 'https://bossfs.sammbo.com/0/1/head/yellowcat.png',
                type: 0,
                size: 1024,
                height: 600,
                width: 600
            },
            {
                url: 'https://bossfs.sammbo.com/0/1/head/yellowcat.png?x-oss-process=image/resize,l_720',
                type: 1,
                size: 512,
                height: 400,
                width: 400
            },
            {
                url: 'https://bossfs.sammbo.com/0/1/head/yellowcat.png?x-oss-process=image/resize,l_198',
                type: 2,
                size: 256,
                height: 300,
                width: 300
            }
        ],
        isHD: true, // 是否高清
    },
    video: {
        coverFormat: 0,
        coverHeight: 200,
        coverSize: 135455,
        coverUrl: "https://bossfs.sammbo.com/2/1/260392/2020/11/1604556149509.jpg",
        coverWidth: 300,
        duration: 5000,
        videoFormat: 5,
        videoSize: 2492145,
        videoUrl: "https://bossfs.sammbo.com/2/1/260392/2020/11/1604556149616.MOV",
    }
}
