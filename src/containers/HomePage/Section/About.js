import React, { Component } from 'react';
import { connect } from 'react-redux';

class About extends Component {
    render() {
        return (
            <div className="section-share section-about">
                <div className="section-about-header">
                    Truyền thông nói gì về BookingCare
                </div>
                <div className="section-about-content">
                    <div className="content-left">
                        <iframe 
                            width="100%" height="318px" src="https://www.youtube.com/embed/FyDQljKtWnI" 
                            title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN" 
                            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>
                    </div>
                    <div className="content-right">
                        <p>
                            Hệ thống BookingCare cung cấp dịch vụ đặt lịch khám với các bác sĩ chuyên khoa uy tín hàng đầu tại Hà Nội. 
                            Chúng tôi tìm hiểu và giới thiệu danh sách Bác sĩ được nhiều bệnh nhân tin tưởng, mong muốn được khám, đồng thời được đồng nghiệp 
                            trong ngành đánh giá cao. Các bác sĩ đã, đang công tác tại các bệnh viện hàng đầu như: Bệnh viện Bạch Mai, Bệnh Viện Việt Đức, Bệnh 
                            viện TW Quân đội 108, Bệnh viện Quân Y 103, Bệnh viện Nhi TW, Bệnh viện Tai Mũi Họng TW, Viện Tim mạch Việt Nam…Nhiều người đạt danh 
                            hiệu Thầy thuốc Nhân dân, Thầy thuốc ưu tú, bác sĩ cao cấp hoặc đạt bằng cấp Bác sĩ chuyên khoa, Bác sĩ nội trú… 
                            <p>
                                Hiện tại, hầu hết các bác sĩ có lịch khám trong giờ hoặc ngoài giờ hành chính, tại các bệnh viện hoặc phòng khám tư nhân uy tín, được chọn lọc kỹ lưỡng tại Hà Nội.
                            </p>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
