import { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client'
import { IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system';
import SendIcon from '@mui/icons-material/Send';
import AppInfo from './constants/General'
import Colors from './constants/Colors'

import Lottie from 'react-lottie';
import NoChat from './lotties/LandingPage.json';


const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: NoChat,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};


function App() {
  const socket = io.connect(AppInfo.server_production_api)

  const [sendData, setSendData] = useState("")
  const [messageList, setMessageList] = useState([])

  const handleSendBtn = () => {
    if (sendData !== '') {
      socket.emit('send_msg', { message: sendData })
      setSendData('')
    }
  }

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      handleSendBtn();
    }
  }


  useEffect(() => {
    socket.on('receive_msg', data => {
      // console.log(data);
      setMessageList([...messageList, data])
    })


  }, [socket])

  return (
    <Box
      sx={{
        backgroundColor: '',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >

      {/* Header */}
      <Box
        sx={{
          backgroundColor: Colors.LIGHT_GREY,
        }}
      >
        <Stack direction='row' alignItems='center' width='70%'>
          <Box component='img'
            alt="Loading"
            src='https://source.unsplash.com/random'
            sx={{ ml: 2, mt: 2, mb: 2, width: 60, height: 60, objectFit: 'cover', borderRadius: '50%' }}
          />
          <Typography fontSize={{ lg: 30, md: 30, sm: 25, xs: 25 }} sx={{ color: Colors.MAIN_APP_COLOR, fontWeight: "bold", ml: 3, whiteSpace: 'nowrap' }}>
            {AppInfo.title}
          </Typography>
        </Stack>
      </Box>


      {/* Body */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          backgroundColor: Colors.DARK_THREE,

        }}
      >


        <Stack alignItems='center' pt='2%'>

          {
            messageList.length === 0 ?
              <>
                <Lottie
                  options={defaultOptions}
                  width={350}
                />
                <Typography sx={{ color: '#fff', fontWeight: 'bold', m: 2, }} fontSize={{ lg: 30, md: 30, sm: 25, xs: 25 }}> Talk to strangers! </Typography>
              </>
              :
              <>
                <Paper
                  sx={{ mt: 2, mb: 2, width: { md: 500, xs: 350 }, p: 2, boxShadow: { xs: "none", md: "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)" } }}
                >

                  {
                    messageList.map(obj => (
                      <Stack
                      key={obj.time}
                        sx={{
                          border: `1px solid ${Colors.MAIN_APP_COLOR}`,
                          borderLeft: `5px solid ${Colors.MAIN_APP_COLOR}`,
                          borderRadius: 5,
                          padding: 1,
                          margin: 1
                        }}>
                        <Typography variant='h6' fontWeight='bold'> {obj.text} </Typography>
                        <Typography variant='body2'> {obj.time} </Typography>
                      </Stack>
                    ))
                  }

                </Paper>
              </>
          }

        </Stack>

        <Stack>

        </Stack>
      </Box>


      {/* TextArea */}
      <Box
        sx={{
          backgroundColor: Colors.LIGHT_GREY,
        }}
      >
        <Stack direction={'row'} m={1} >
          <TextField
            placeholder='Enter Message...'
            size='small'
            value={sendData}
            fullWidth
            sx={{ mr: 1 }}
            onChange={e => setSendData(e.target.value)}
            onKeyDown={handleEnterKey}
          />
          <IconButton
            onClick={e => handleSendBtn(e)}
            sx={{ backgroundColor: Colors.MAIN_APP_COLOR, '&:hover': { backgroundColor: Colors.MAIN_APP_COLOR, } }}
          >
            <SendIcon sx={{ color: '#fff', }} />
          </IconButton>
          {/* <Button
            endIcon={<SendIcon />}
            sx={{ m: 1 }}
            onClick={e => handleSendBtn(e)}
            variant='contained'
            size='small'>Send</Button> */}
        </Stack>
      </Box>

    </Box>
  );
}

export default App;



/***
 * 
 * 
 *  


 */